param location string = resourceGroup().location
param sqlServerName string
param customerName string
param databaseName string = 'novahcm-${customerName}'

resource sqlDatabase 'Microsoft.Sql/servers/databases@2021-11-01' = {
  name: '${sqlServerName}/${databaseName}'
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: 2147483648 // 2GB
  }
}

output databaseName string = sqlDatabase.name
