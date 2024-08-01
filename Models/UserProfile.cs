using Microsoft.AspNetCore.Identity;

namespace GamingOceanTcg.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string IdentityUserId { get; set; } = "";
    // TODO FIX NULL
    public IdentityUser? IdentityUser { get; set; }
}