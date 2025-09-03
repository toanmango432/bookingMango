using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace OnlineStore.Pages
{
    public class NewOnlineModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public int NewOnlineId { get; set; }

        public void OnGet(int id)
        {
            NewOnlineId = id;
        }
    }
}