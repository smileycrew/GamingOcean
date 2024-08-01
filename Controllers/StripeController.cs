using GamingOceanTcg.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace GamingOceanTcg.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StripeController : ControllerBase
{
    // private readonly ChargeService _chargeService;
    private readonly CustomerService _customerService;
    private readonly StripeKeys _keys;
    private readonly ProductService _productService;
    // private readonly TokenService _tokenService;

    public StripeController(CustomerService customerService, IOptions<StripeKeys> keys, ProductService productService)
    {
        // _chargeService = chargeService;
        _customerService = customerService;
        _keys = keys.Value;
        _productService = productService;
        // _tokenService = tokenService;
    }

    [HttpPost("CreateCustomer")]
    public async Task<dynamic> CreateCustomer([FromBody] StripeCustomer customerInfo)
    {
        StripeConfiguration.ApiKey = _keys.SecretKey;

        var customerOptions = new CustomerCreateOptions
        {
            Email = customerInfo.Email,
            Name = customerInfo.Name
        };
        var customer = await _customerService.CreateAsync(customerOptions);

        return new { customer };
    }

    [HttpGet("GetAllProducts")]
    public IActionResult GetAllProducts()
    {
        StripeConfiguration.ApiKey = _keys.SecretKey;

        var options = new ProductListOptions
        {
            Expand = new List<string>()
            {
                "data.default_price"
            }
        };
        var products = _productService.List(options);

        return Ok(products);
    }

    [HttpPost("Pay")]
    public IActionResult Pay([FromBody] string priceId)
    {
        StripeConfiguration.ApiKey = _keys.SecretKey;

        var options = new SessionCreateOptions
        {
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Price = priceId,
                    Quantity = 1
                },
            },
            Mode = "payment",
            SuccessUrl = "http://localhost:5173/success",
            CancelUrl = "http://localhost:5173/"
        };
        // options.Customer = "cus_QZXoeZwWsAWkMz";
        var service = new SessionService();

        Session session = service.Create(options);

        // Response.Headers.Add("Location", session.Url);
        // return new StatusCodeResult(303);
        return Ok(session);
    }
}