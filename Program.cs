using System.Text.Json.Serialization;
using GamingOceanTcg.Data;
using GamingOceanTcg.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.Cookie.Name = "GamingOceanLoginCookie";
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.HttpOnly = true;
        options.Cookie.MaxAge = new TimeSpan(7, 0, 0, 0);
        options.SlidingExpiration = true;
        options.ExpireTimeSpan = new TimeSpan(24, 0, 0);
        options.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });
builder.Services.AddControllers().AddJsonOptions(opts =>
{
    opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddIdentityCore<IdentityUser>(config =>
            {
                // TODO CHANGE TO CLIENT REQUEST
                config.Password.RequireDigit = false;
                config.Password.RequiredLength = 8;
                config.Password.RequireLowercase = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;
                config.User.RequireUniqueEmail = true;
            })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<GamingOceanTcgDbContext>();

builder.Services.AddNpgsql<GamingOceanTcgDbContext>(builder.Configuration["GamingOceanTcgDbConnectionString"]);
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddSwaggerGen();
builder.Services.Configure<StripeKeys>(builder.Configuration.GetSection("Stripe"));

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();

app.Run();