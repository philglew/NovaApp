using Microsoft.AspNetCore.Mvc;

namespace Nova.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
}