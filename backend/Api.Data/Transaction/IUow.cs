using System;
using System.Threading.Tasks;
using Api.Data.Interfaces;

namespace Api.Data.Transaction
{
    public interface IUow : IDisposable
    {
        IActivityRepository Activities { get; }
        ICommentRepository Comments { get; }

        Task<int> Commit();
    }
}