using System.Collections.Generic;
using System.Linq;
using Api.CrossCutting.AutoMapper;
using Api.Services.Application.Activitities;
using Api.Services.Infrastructure.Photos;
using Api.Services.Infrastructure.Photos.Interfaces;
using Api.Services.Infrastructure.Security;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Api.CrossCutting.DependencyInjection
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddServicesDependencies(this IServiceCollection services, IConfiguration config)
        {

            services.AddCors(opt => {
                opt.AddDefaultPolicy(policy => {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("WWW-Authenticate")
                        .WithOrigins("http://localhost:8000");
                });
            });

            services.AddControllers().AddFluentValidation(config => 
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Application", Version = "v1" });

                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
                    Description = "Enter the JWT token",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme {
                            Reference = new OpenApiReference {
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        }, new List<string>()
                    }
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddSignalR();

            return services;
        }
    }
}