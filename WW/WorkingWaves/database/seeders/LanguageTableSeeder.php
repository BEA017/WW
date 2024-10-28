<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('languages')->insert([
            ['name' => 'Английский'],
            ['name' => 'Русский'],
            ['name' => 'Белорусский'],
            ['name' => 'Французский'],
            ['name' => 'Корейский'],
            ['name' => 'Японский'],
            ['name' => 'Немецкий'],

        ]);
    }
}
