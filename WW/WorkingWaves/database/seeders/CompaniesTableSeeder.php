<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            ['user_id' => 1, 'name' => 'TechCorp', 'description' => 'A leading tech company.', 'logo' => 'company1.png', 'website' => 'https://www.techcorp.com'],
            ['user_id' => 2, 'name' => 'MarketingPros', 'description' => 'Top marketing agency.', 'logo' => 'company2.png', 'website' => 'https://www.marketingpros.com'],
            // Добавьте другие тестовые компании
        ]);
    }
}
