using Microsoft.EntityFrameworkCore;
using Nova.Core.Interfaces;
using Nova.Infrastructure.Data;

namespace Nova.Infrastructure.Repositories;

public abstract class Repository<T> : IRepository<T> where T : class
{
    protected readonly NovaDbContext _context;
    protected readonly DbSet<T> _dbSet;

    protected Repository(NovaDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<T> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

public virtual async Task UpdateAsync(T entity)
{   
    var existing = await _dbSet.FindAsync(GetEntityId(entity));
    if (existing != null)
    {
        _context.Entry(existing).CurrentValues.SetValues(entity);
        await _context.SaveChangesAsync();
    }
}

private static object GetEntityId(T entity)
{
    // This assumes your entities have an Id property
    var idProperty = typeof(T).GetProperty("EmployeeId") ?? 
                    typeof(T).GetProperty("DepartmentId");
    return idProperty?.GetValue(entity);
}

    public virtual async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public virtual async Task<bool> ExistsAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        return entity != null;
    }
}