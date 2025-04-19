using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalBackend.Data;
using System.Threading.Tasks;

namespace FinalBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntertainmentController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainmentController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        // GET: api/entertainment
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var entertainers = await _context.Entertainers.ToListAsync();
            return Ok(entertainers);
        }

        // ✅ GET: api/entertainment/1001
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
                return NotFound();

            return Ok(entertainer);
        }

        // ✅ POST: api/entertainment
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = entertainer.EntertainerId }, entertainer);
        }

        // ✅ PUT: api/entertainment/1001
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Entertainer updated)
        {
            if (id != updated.EntertainerId)
                return BadRequest();

            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ DELETE: api/entertainment/1001
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
                return NotFound();

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
