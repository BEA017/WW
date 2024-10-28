<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverLicenseJobTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('driver_license_jobs')->insert([
            ['driver_license_id' => 1, 'job_id' => 1, 'driver_experience' => 1],
            ['driver_license_id' => 2, 'job_id' => 2, 'driver_experience' => 2],
            ['driver_license_id' => 3, 'job_id' => 3, 'driver_experience' => 4],
            ['driver_license_id' => 4, 'job_id' => 4, 'driver_experience' => 4],

            // Добавьте другие тестовые навыки для вакансий
        ]);
    }
}
