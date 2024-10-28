<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CategoriesTableSeeder::class,
            UsersTableSeeder::class,
            CompaniesTableSeeder::class,
            ResumeTableSeeder::class,
            JobsTableSeeder::class,
            ApplicationsTableSeeder::class,
            NotificationsTableSeeder::class,
            SkillsTableSeeder::class,
            LocationTableSeeder::class,
            EmploymentTypeTableSeeder::class,
            WorkSchedulesTableSeeder::class,
            JobSkillsTableSeeder::class,
            ResumeSkillsTableSeeder::class,
            ChatsTableSeeder::class,
            MessagesTableSeeder::class,
            JobViewsTableSeeder::class,
            ResumeViewsTableSeeder::class,
            ResumeSkillsTableSeeder::class,
            CompanyRatingsTableSeeder::class,
            DriverLicenseTableSeeder::class,
            DriverLicenseJobTableSeeder::class,
            DriverLicenseResumesTableSeeder::class,
            LanguageTableSeeder::class,
            LanguagesJobsTableSeeder::class,
            LanguagesResumesTableSeeder::class,
            AdStatusTableSeeder::class

        ]);
    }
}
