    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('company_ratings', function (Blueprint $table) {
                $table->id()->autoIncrement();
                $table->unsignedBigInteger('company_id') ;
                $table->unsignedBigInteger('user_id') ;
                $table->tinyInteger('rating')->unsigned()->check(function ($rating) {
                    return $rating >= 1 && $rating <= 5;
                });
                $table->text('review')->nullable();
                $table->timestamp('rated_at')->useCurrent();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('company_ratings');
        }
    };
