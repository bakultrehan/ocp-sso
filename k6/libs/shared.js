//-------------------------------------------------------------------------
// Copyright © 2019 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//-------------------------------------------------------------------------
import { Rate } from 'k6/metrics';

// Metrics setup:
export const RATE = {
    authSuccess: new Rate('authentication_successful'),
    errorRate: new Rate('errors'),
};

// SSO Environment configs:
export const SSO_CONFIG = {
    env: (__ENV.SSO_ENV) ? __ENV.SSO_ENV : 'sbox',
    realmId: (__ENV.SSO_REALM) ? __ENV.SSO_REALM : 'abcd1234',
    clientId: (__ENV.SSO_CLIENT) ? __ENV.SSO_CLIENT : 'k6',
};

// auth setting configs:
export const AUTH_CONFIG = {
    ssoEndpointUrl: `https://${SSO_CONFIG.env}.oidc.gov.bc.ca/auth/realms/${SSO_CONFIG.realmId}`,
    tokenEndpoint: '/protocol/openid-connect/token',
    grantType: 'password',
    userPassword: (__ENV.SSO_PASSWORD) ? __ENV.SSO_PASSWORD : 'test',
};

// local keycloak users:
export const USERS = [
  { username: "test_01", password: AUTH_CONFIG.userPassword, token: null, refresh: null, expires: null },
];

// expected token fields:
export const TOKEN_FIELDS = ['access_token', 'refresh_token', 'expires_in'];

// helper functions:
export function getExpiresTime(seconds) {
    return (Date.now() + seconds * 1000);
}