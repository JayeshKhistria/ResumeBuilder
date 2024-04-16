namespace MyResume_API.Models
{
    public class Resumes
    {
        public int? resume_id { get; set; }

        public int? userId { get; set; }

        public Object? resume { get; set; }

        public int? status { get; set; }

        public string? created_at { get; set; }

        public string? updated_at { get; set; }
    }
}
