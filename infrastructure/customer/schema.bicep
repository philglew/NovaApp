param location string = resourceGroup().location
param sqlServerName string
param databaseName string
param administratorLogin string
@secure()
param administratorLoginPassword string

resource deploymentScript 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'deploySchema'
  location: location
  kind: 'AzurePowerShell'
  properties: {
    azPowerShellVersion: '7.0'
    timeout: 'PT30M'
    arguments: '-sqlServerName ${sqlServerName} -databaseName ${databaseName} -administratorLogin ${administratorLogin} -administratorLoginPassword ${administratorLoginPassword}'
    scriptContent: '''
      param(
        [string] $sqlServerName,
        [string] $databaseName,
        [string] $administratorLogin,
        [string] $administratorLoginPassword
      )
      
      $connectionString = "Server=tcp:$sqlServerName.database.windows.net,1433;Initial Catalog=$databaseName;Persist Security Info=False;User ID=$administratorLogin;Password=$administratorLoginPassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
      
      $schemaScript = @"
        -- Create schema
        CREATE SCHEMA nova;
        GO

        -- Rest of your schema.sql content here
        -- Tables creation scripts
"@

      Invoke-Sqlcmd -ConnectionString $connectionString -Query $schemaScript
    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
  }
}
