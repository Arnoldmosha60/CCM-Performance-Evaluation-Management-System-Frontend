import { baseURL } from "./baseUrl"

export const apis = {
    loginUrl: baseURL + 'api/auth/login',
    registerUrl: baseURL + 'api/auth/register',
    getWilayaRepresentativesUrl: baseURL + 'api/ccm/representatives/',
    saveObjectivesUrl: baseURL + 'api/ccm/save-objectives/',
    getUserInformationUrl: baseURL + 'api/auth/user-information',
    getUserObjectivesUrl: baseURL + 'api/ccm/user-objectives',
    saveTargetsUrl: baseURL + 'api/ccm/save-targets/',
    getObjectiveTargetsUrl: baseURL + 'api/ccm/objective-targets',
    saveIndicatorsUrl: baseURL + 'api/ccm/save-indicators/',
    getTargetIndicatorsUrl: baseURL + 'api/ccm/target-indicators',
}