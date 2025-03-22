using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskBuddyApi.Migrations
{
    /// <inheritdoc />
    public partial class changesinTaskerTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceTask_Customer_CustomerId",
                table: "ServiceTask");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceTask_Taskers_TaskerId",
                table: "ServiceTask");

            migrationBuilder.DropForeignKey(
                name: "FK_Taskers_TaskCategory_TaskCategoryId",
                table: "Taskers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskCategory",
                table: "TaskCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceTask",
                table: "ServiceTask");

            migrationBuilder.RenameTable(
                name: "TaskCategory",
                newName: "TaskCategories");

            migrationBuilder.RenameTable(
                name: "ServiceTask",
                newName: "ServiceTasks");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Taskers",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Taskers",
                newName: "GovernmentId");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Taskers",
                newName: "FullName");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceTask_TaskerId",
                table: "ServiceTasks",
                newName: "IX_ServiceTasks_TaskerId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceTask_CustomerId",
                table: "ServiceTasks",
                newName: "IX_ServiceTasks_CustomerId");

            migrationBuilder.AddColumn<string>(
                name: "Bio",
                table: "Taskers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Taskers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "Taskers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "HourlyRate",
                table: "Taskers",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskCategories",
                table: "TaskCategories",
                column: "TaskCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceTasks",
                table: "ServiceTasks",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceTasks_Customer_CustomerId",
                table: "ServiceTasks",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceTasks_Taskers_TaskerId",
                table: "ServiceTasks",
                column: "TaskerId",
                principalTable: "Taskers",
                principalColumn: "TaskerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Taskers_TaskCategories_TaskCategoryId",
                table: "Taskers",
                column: "TaskCategoryId",
                principalTable: "TaskCategories",
                principalColumn: "TaskCategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceTasks_Customer_CustomerId",
                table: "ServiceTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceTasks_Taskers_TaskerId",
                table: "ServiceTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Taskers_TaskCategories_TaskCategoryId",
                table: "Taskers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskCategories",
                table: "TaskCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiceTasks",
                table: "ServiceTasks");

            migrationBuilder.DropColumn(
                name: "Bio",
                table: "Taskers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Taskers");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Taskers");

            migrationBuilder.DropColumn(
                name: "HourlyRate",
                table: "Taskers");

            migrationBuilder.RenameTable(
                name: "TaskCategories",
                newName: "TaskCategory");

            migrationBuilder.RenameTable(
                name: "ServiceTasks",
                newName: "ServiceTask");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Taskers",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "GovernmentId",
                table: "Taskers",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Taskers",
                newName: "Address");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceTasks_TaskerId",
                table: "ServiceTask",
                newName: "IX_ServiceTask_TaskerId");

            migrationBuilder.RenameIndex(
                name: "IX_ServiceTasks_CustomerId",
                table: "ServiceTask",
                newName: "IX_ServiceTask_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskCategory",
                table: "TaskCategory",
                column: "TaskCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiceTask",
                table: "ServiceTask",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceTask_Customer_CustomerId",
                table: "ServiceTask",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceTask_Taskers_TaskerId",
                table: "ServiceTask",
                column: "TaskerId",
                principalTable: "Taskers",
                principalColumn: "TaskerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Taskers_TaskCategory_TaskCategoryId",
                table: "Taskers",
                column: "TaskCategoryId",
                principalTable: "TaskCategory",
                principalColumn: "TaskCategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
