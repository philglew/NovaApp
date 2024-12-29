using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace Nova.API.Services;

public class ConfigurationService
{
    private readonly SecretClient _secretClient;

    public ConfigurationService(IConfiguration configuration)
    {
        var keyVaultUrl = configuration["KeyVault:Url"] 
            ?? throw new InvalidOperationException("KeyVault URL is not configured");
        _secretClient = new SecretClient(new Uri(keyVaultUrl), new DefaultAzureCredential());
    }

    public async Task<string> GetConnectionString()
    {
        var secret = await _secretClient.GetSecretAsync("SqlConnectionString");
        return secret.Value.Value;
    }
}