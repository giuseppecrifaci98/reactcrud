using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace ReactCrudDemoTest
{
    public class TestDb<T> : DbSet<T>, IQueryable, IEnumerable<T>
        where T : class
    {
        ObservableCollection<T> Observ;
        IQueryable query;
        public TestDb()
        {
            Observ = new ObservableCollection<T>();
            query = Observ.AsQueryable();
        }
        public override T Add(T thing)
        {
            Observ.Add(thing);
            return thing;
        }
        public override T Remove(T thing)
        {
            Observ.Remove(thing);
            return thing;
        }
        public override T Attach(T thing)
        {
            Observ.Add(thing);
            return thing;
        }
        public override T Create()
        {
            return Activator.CreateInstance<T>();
        }
        public override TDerivedEntity Create<TDerivedEntity>()
        {
            return Activator.CreateInstance<TDerivedEntity>();
        }
        public override ObservableCollection<T> Local
        {
            get { return new ObservableCollection<T>(Observ); }
        }
        Type IQueryable.ElementType
        {
            get { return query.ElementType; }
        }
        System.Linq.Expressions.Expression IQueryable.Expression
        {
            get { return query.Expression; }
        }
        IQueryProvider IQueryable.Provider
        {
            get { return query.Provider; }
        }
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return Observ.GetEnumerator();
        }
        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return Observ.GetEnumerator();
        }
    }
    }
