<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverLicenseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('drivers_licenses')->insert([
            ['name' => 'A'],
            ['name' => 'A1'],
            ['name' => 'B'],
            ['name' => 'B1'],
            ['name' => 'C'],
            ['name' => 'C1'],
            ['name' => 'D'],
            ['name' => 'D1'],
            ['name' => 'BE'],
            ['name' => 'C1E'],
            ['name' => 'CE'],
            ['name' => 'DE'],
            ['name' => 'T'],
            ['name' => 'Водный транспорт'],
            ['name' => 'Лицензия пилота'],
            // Добавьте другие тестовые навыки
        ]);
    }
}
