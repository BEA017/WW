<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('jobs')->insert([
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Senior Software Engineer', 'description' => 'Develop and maintain software applications.',   'salary' => '100000-120000',   'location_id' => 2],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Marketing Specialist', 'description' => 'Create and implement marketing strategies.',  'salary' => '60000-80000',   'location_id' => 3],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Software Engineer', 'description' => 'Develop and maintain software applications.', 'salary' => '70000-90000',   'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Data Analyst', 'description' => 'Analyze and interpret complex datasets.',  'salary' => '60000-80000',   'location_id' => '2'],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Project Manager', 'description' => 'Manage projects to ensure timely completion.',  'salary' => '80000-100000',   'location_id' => 5],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Graphic Designer', 'description' => 'Design graphics for various projects.', 'salary' => '50000-70000',   'location_id' => 6],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'System Administrator', 'description' => 'Maintain and configure IT systems.',  'salary' => '60000-90000', 'location_id' => 6],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Marketing Specialist', 'description' => 'Develop and execute marketing campaigns.',  'salary' => '55000-75000',  'location_id' => 7],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'SEO Specialist', 'description' => 'Optimize web content for search engines.',  'salary' => '50000-70000',   'location_id' => 3],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Content Writer', 'description' => 'Create compelling content for various platforms.', 'salary' => '45000-65000',   'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Business Analyst', 'description' => 'Analyze business processes to improve efficiency.',  'salary' => '70000-90000',   'location_id' => 2],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Technical Support Specialist', 'description' => 'Provide technical support to clients.',  'salary' => '45000-60000',   'location_id' => 2],
             ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'DevOps Engineer', 'description' => 'Manage and improve development pipelines.',  'salary' => '75000-95000',   'location_id' => 3],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'UX/UI Designer', 'description' => 'Design user-friendly interfaces.',  'salary' => '60000-80000',   'location_id' => 3],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'HR Manager', 'description' => 'Manage all HR-related tasks.',  'salary' => '70000-90000',   'location_id' => '5'],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Product Manager', 'description' => 'Oversee product development and execution.',  'salary' => '80000-100000',  'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Accountant', 'description' => 'Manage financial records and reports.',  'salary' => '50000-70000',  'location_id' => 5],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Social Media Manager', 'description' => 'Manage social media accounts and campaigns.',  'salary' => '45000-65000',  'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Network Engineer', 'description' => 'Design, implement, and maintain network systems.',  'salary' => '65000-85000',  'location_id' =>1],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Sales Manager', 'description' => 'Lead and manage sales teams.',  'salary' => '70000-90000',   'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Operations Manager', 'description' => 'Oversee daily operations and manage staff.', 'salary' => '80000-100000',  'location_id' =>11],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Customer Service Representative', 'description' => 'Respond to customer inquiries and resolve issues.', 'salary' => '40000-55000',   'location_id' => 33],
             ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Machine Learning Engineer', 'description' => 'Develop and deploy machine learning models.', 'salary' => '85000-105000',   'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Human Resources Specialist', 'description' => 'Support HR operations and employee relations.', 'salary' => '55000-70000',   'location_id' => 2],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Logistics Coordinator', 'description' => 'Coordinate and optimize logistics operations.',  'salary' => '60000-80000',   'location_id' => 3],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Quality Assurance Tester', 'description' => 'Test software applications for quality.',  'salary' => '50000-70000',   'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Web Developer', 'description' => 'Develop and maintain websites.', 'salary' => '65000-85000',  'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Financial Analyst', 'description' => 'Analyze financial data and provide insights.',  'salary' => '75000-95000',  'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Cloud Architect', 'description' => 'Design and implement cloud solutions.',  'salary' => '90000-110000',  'location_id' => 4],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'HR Coordinator', 'description' => 'Assist in HR duties and employee relations.',  'salary' => '45000-60000',   'location_id' => '63'],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Digital Marketing Manager', 'description' => 'Manage digital marketing campaigns.', 'salary' => '70000-90000',   'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Recruiter', 'description' => 'Source and recruit candidates for various positions.', 'salary' => '50000-70000',   'location_id' => 1],
             ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'IT Support Specialist', 'description' => 'Provide technical support to staff.',  'salary' => '45000-60000',   'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 2, 'title' => 'Business Development Manager', 'description' => 'Identify and develop business opportunities.',  'salary' => '80000-100000', 'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 2, 'title' => 'Customer Success Manager', 'description' => 'Ensure customer satisfaction and retention.',  'salary' => '70000-90000',   'location_id' => 1],
            ['ad_status'=>1, 'company_id' => 2, 'category_id' => 1, 'title' => 'Copywriter', 'description' => 'Write compelling and persuasive copy.',  'salary' => '45000-65000',  'location_id' => 2],
            ['ad_status'=>1, 'company_id' => 1, 'category_id' => 1, 'title' => 'Frontend Developer', 'description' => 'Develop user-facing features for web applications.',  'salary' => '70000-90000',  'location_id' => 1]
         ]);
    }
}
