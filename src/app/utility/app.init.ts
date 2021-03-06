import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'https://keycloakserver3.azurewebsites.net/auth',
                realm: 'Testing',
                clientId: 'Demo',
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25
            },
            loadUserProfileAtStartUp: true,
            // enable-cors: true,
        });
}
