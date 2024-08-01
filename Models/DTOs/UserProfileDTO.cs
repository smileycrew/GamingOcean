using Microsoft.AspNetCore.Identity;

namespace GamingOceanTcg.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string IdentityUserId { get; set; } = "";
    // TODO FIX NULL
    public IdentityUser? IdentityUser { get; set; }
    public string LastName { get; set; } = "";
    public List<string> Roles { get; set; } = [];
    public string UserName { get; set; } = "";
}