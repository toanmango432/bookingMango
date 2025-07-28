using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace OnlineStore.Pages
{
    public class TemplatesModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public int TemplateId { get; set; }

        public void OnGet(int id)
        {
            TemplateId = id;
        }
    }
}
