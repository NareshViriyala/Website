using System.ComponentModel.DataAnnotations;

public class Value
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
    }