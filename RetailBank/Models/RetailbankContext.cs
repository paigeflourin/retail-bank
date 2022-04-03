using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace RetailBank.Models
{
    public partial class RetailbankContext : DbContext
    {
        public RetailbankContext()
        {
        }

        public RetailbankContext(DbContextOptions<RetailbankContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost; Database=Retailbank; User Id=sa; Password=<Ret@ilB@nkPassw0rd>");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.ClientBalance)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("client_balance");

                entity.Property(e => e.ClientName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("client_name");

                entity.Property(e => e.ClientOwes)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("client_owes");

                entity.Property(e => e.ClientOwesFrom)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("client_owes_from");

                entity.Property(e => e.ClientOwesFromAmount)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("client_owes_from_amount");

                entity.Property(e => e.ClientOwesTo)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("client_owes_to");

                entity.Property(e => e.ClientPw)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("client_pw");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
