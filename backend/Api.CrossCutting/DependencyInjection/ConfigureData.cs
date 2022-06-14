using Api.Data;
using Api.Data.Interfaces;
using Api.Data.Repositories;
using Api.Data.Transaction;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public static class ConfigureData
    {
        public static IServiceCollection AddDataDependencies(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(opt => {
                opt.UseSqlite(connectionString);
            });

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));

            services.AddTransient<IUow, Uow>();

            return services;
        }
    }
}