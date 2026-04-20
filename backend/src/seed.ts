import { DataSource } from 'typeorm';
import { User, UserRole } from './users/user.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const users = [
    { username: 'admin', password: 'admin123', role: UserRole.ADMIN },
    { username: 'client', password: 'client123', role: UserRole.CLIENT },
    { username: 'fournisseur', password: 'fournisseur123', role: UserRole.FOURNISSEUR },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const user = userRepo.create({ ...u, password: hashedPassword });
    await userRepo.save(user);
  }

  console.log('Seed terminé : Admin, Client, Fournisseur créés.');
  process.exit(0);
}

seed();
