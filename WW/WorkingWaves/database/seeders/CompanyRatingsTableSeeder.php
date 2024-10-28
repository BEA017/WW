<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanyRatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('company_ratings')->insert([
            ['company_id' => 1, 'user_id' => 1, 'rating' => 5, 'review' => 'Great company to work with.'],
            ['company_id' => 2, 'user_id' => 2, 'rating' => 4, 'review' => 'Good work environment.'],
            // Добавьте другие тестовые рейтинги компаний
        ]);
    }
}
