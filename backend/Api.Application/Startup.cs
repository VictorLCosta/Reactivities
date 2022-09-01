using Api.Application.Hubs;
using Api.Application.Middlewares;
using Api.CrossCutting.DependencyInjection;
using Api.Data.Transaction;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Application
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataDependencies(_config);
            services.AddServicesDependencies(_config);
            services.AddIdentityDependencies(_config);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCsp(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com",
                    "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/"
                ))
                .FontSources(s => s.Self().CustomSources(
                    "https://fonts.gstatic.com",
                    "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/themes/default/assets/fonts/",
                    "data:"
                ))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources(
                    "https://res.cloudinary.com",
                    "data:"
                ))
                .ScriptSources(s => s.Self())
            );

            app.Use(async (context, next) =>
            {
                await next.Invoke();

                var unitOfWork = (IUow)context.RequestServices.GetService(typeof(IUow));
                await unitOfWork.Commit();
                unitOfWork.Dispose();
            });

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Application v1");
                    c.RoutePrefix = "swagger";
                });
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
