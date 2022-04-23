const BODY_VALIDATION = 'body';
const QUERY_VALIDATION = 'query';
const PARAMS_VALIDATION = 'params';

const VALIDATION_TYPES = [BODY_VALIDATION, QUERY_VALIDATION, PARAMS_VALIDATION];
function getValidationType(validationDefinition) {
    if (VALIDATION_TYPES.includes(validationDefinition.type)) {
        return validationDefinition.type;
    }
    return BODY_VALIDATION;
}

/**
 * A validation object that defines what and how it will be validated
 * @typedef {object} ExpressValidationDefinition
 * @property {'body'|'query'|'params'} [type='body'] - Type of request validation
 * @property {string} [propertyName] - Only needed for query and params validations
 * @property {object} validator - Joi validator that is going to be used
 */

/**
 * Validate query paramter
 * @param {object} req - Express request object
 * @param {ExpressValidationDefinition} validation - Validation object
 */
function validateQuery(req, validation) {
    return validation.validator.validateAsync(req.query[validation.propertyName]);
}

/**
 * Validate path paramter
 * @param {object} req - Express request object
 * @param {ExpressValidationDefinition} validation - Validation object
 */
function validatePathParam(req, validation) {
    return validation.validator.validateAsync(req.params[validation.propertyName]);
}

/**
 * Validate request body
 * @param {object} req - Express request object
 * @param {ExpressValidationDefinition} validation - Validation object
 */
function validateBody(req, validation) {
    return validation.validator.validateAsync(req.body);
}

/**
 * Validate an array of conditions
 * @param {ExpressValidationDefinition[]} validations - Validations to execute
 */
function validate(validations) {
    async function middleware(req, res, next) {
        const validationPromises = [];

        validations.forEach((validation) => {
            const validationType = getValidationType(validation);

            // Even if the promise rejects, we still want to continue execution of other promises
            // This has to be done because bluebird does not support Promise.allSettled
            if (validationType === QUERY_VALIDATION) {
                validationPromises.push(
                    validateQuery(req, validation)
                        .then(value => ({ status: 'fulfilled', value }))
                        .catch(error => ({ status: 'rejected', reason: error })),
                );
            } else if (validationType === PARAMS_VALIDATION) {
                validationPromises.push(
                    validatePathParam(req, validation)
                        .then(value => ({ status: 'fulfilled', value }))
                        .catch(error => ({ status: 'rejected', reason: error })),
                );
            } else {
                validationPromises.push(
                    validateBody(req, validation)
                        .then(value => ({ status: 'fulfilled', value }))
                        .catch(error => ({ status: 'rejected', reason: error })),
                );
            }
        });

        const results = await Promise.all(validationPromises);
        const errors = [];

        // Results return whether the promise was 'fulfilled' or 'rejected'
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                result.reason.details.forEach((errorDetail) => {
                    const error = {
                        message: errorDetail.message,
                        context: errorDetail.context,
                        path: errorDetail.path,
                    };
                    const validation = validations[index];
                    if (validation.propertyName) {
                        error.propertyName = validation.propertyName;
                    }
                    if (validation.type === QUERY_VALIDATION) {
                        error.type = 'query';
                    }
                    if (validation.type === PARAMS_VALIDATION) {
                        error.type = 'param';
                    }

                    errors.push(error);
                });
            }
        });

        if (errors.length) {
            return next({
                error: {
                    httpStatus: 400,
                    moreInfo: errors,
                },
            });
        }

        // Validation passed, set values to Joi results in case any sanitization was done
        results.forEach((result, index) => {
            const { value } = result;
            const validation = validations[index];
            const validationType = getValidationType(validation);

            if (validationType === QUERY_VALIDATION) {
                req.query[validation.propertyName] = value;
            } else if (validationType === PARAMS_VALIDATION) {
                req.params[validation.propertyName] = value;
            } else {
                req.body = value;
            }
        });

        return next();
    }

    return middleware;
}

/**
 * Obtains an express query validation definition
 * @param {string} propertyName - Query property to be validated
 * @param {object} validator - Joi validator
 * @returns {ExpressValidationDefinition} - Validation definition to be passed to the validate function
 */
function queryValidation(propertyName, validator) {
    if (!propertyName) {
        throw new Error('Query validation property name is required');
    }
    return { type: QUERY_VALIDATION, propertyName, validator };
}

/**
 * Obtains an express param validation definition
 * @param {string} propertyName - Query property to be validated
 * @param {object} validator - Joi validator
 * @returns {ExpressValidationDefinition} - Validation definition to be passed to the validate function
 */
function paramValidation(propertyName, validator) {
    if (!propertyName) {
        throw new Error('Query validation property name is required');
    }
    return { type: PARAMS_VALIDATION, propertyName, validator };
}

/**
 * Obtains an express body validation definition
 * @param {object} validator - Joi validator
 * @returns {ExpressValidationDefinition} - Validation definition to be passed to the validate function
 */
function bodyValidation(validator) {
    return { type: BODY_VALIDATION, validator };
}

module.exports = {
    validate,
    queryValidation,
    paramValidation,
    bodyValidation,
};