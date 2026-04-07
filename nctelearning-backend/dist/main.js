"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
async function ensureQuizFloatColumns(dataSource) {
    const targets = [
        { table: 'quiz_attempt_answers', columns: ['pointsEarned', 'points_earned'] },
        { table: 'quiz_attempts', columns: ['score', 'totalPoints', 'total_points'] },
    ];
    for (const { table, columns } of targets) {
        for (const column of columns) {
            try {
                const rows = await dataSource.query(`
            SELECT data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = $1
              AND column_name = $2
            LIMIT 1
          `, [table, column]);
                const dataType = rows?.[0]?.data_type;
                if (!dataType)
                    continue;
                const isInteger = dataType === 'integer' || dataType === 'bigint' || dataType === 'smallint';
                if (!isInteger)
                    continue;
                await dataSource.query(`ALTER TABLE "public"."${table}" ALTER COLUMN "${column}" TYPE double precision USING "${column}"::double precision`);
            }
            catch {
            }
        }
    }
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads',
    });
    try {
        const dataSource = app.get(typeorm_1.DataSource);
        if (dataSource?.isInitialized) {
            await ensureQuizFloatColumns(dataSource);
        }
        else if (dataSource) {
            await dataSource.initialize();
            await ensureQuizFloatColumns(dataSource);
        }
    }
    catch {
    }
    const port = process.env.PORT || 2030;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map