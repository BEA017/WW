<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverLicenseResumesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('driver_license_resumes')->insert([
            ['driver_license_id' => 1, 'resume_id' => 1 ],
            ['driver_license_id' => 2, 'resume_id' => 2 ],
            ['driver_license_id' => 3, 'resume_id' => 3 ],
            ['driver_license_id' => 4, 'resume_id' => 4 ],

            // Добавьте другие тестовые навыки для вакансий
        ]);
    }
}
