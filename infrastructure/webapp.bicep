resource webApp 'Microsoft.Web/sites@2022-09-01' existing = {
  name: webAppName
}

resource managedIdentity 'Microsoft.Web/sites/config@2022-09-01' = {
  parent: webApp
  name: 'web'
  properties: {
    managedServiceIdentityId: 1
  }
}
