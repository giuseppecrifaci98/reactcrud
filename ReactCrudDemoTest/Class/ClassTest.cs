using System;
using System.Collections.Generic;
using System.Text;

namespace ReactCrudDemoTest.Class
{
    public class JsonConvertedClass
    {
        public string ContentType { get; set; }
        public string SerializerSettings { get; set; }
        public int? StatusCode { get; set; }
        public bool Value { get; set; }
    }
    public class JsonConvertedClassReturnValue
    {
        public string ContentType { get; set; }
        public string SerializerSettings { get; set; }
        public int? StatusCode { get; set; }
        public string Value { get; set; }
    }
    public class JsonConvertClassError
    {
        public int? StatusCode { get; set; }
    }
}
