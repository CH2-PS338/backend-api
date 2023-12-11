/**
 * @swagger
 * tags:
 *   name: FactHealths
 *   description: Operasi-operasi terkait dengan fakta kesehatan
 */

/**
 * @swagger
 * /addFactHealths:
 *   post:
 *     summary: Menambahkan fakta kesehatan baru
 *     tags: [FactHealths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fact:
 *                 type: string
 *               source:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fakta kesehatan berhasil ditambahkan
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: Fact added successfully
 *               data:
 *                 fact: "Informasi Fakta Kesehatan"
 *                 source: "Sumber Informasi"
 *       400:
 *         description: Parameter yang diperlukan tidak disediakan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: "Please provide all the required details"
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /facthealths:
 *   get:
 *     summary: Mengambil fakta kesehatan secara acak
 *     tags: [FactHealths]
 *     responses:
 *       200:
 *         description: Fakta kesehatan acak berhasil diambil
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: "Random fact fetched successfully"
 *               data:
 *                 - factId: 1
 *                   fact: "Informasi Fakta Kesehatan 1"
 *                   source: "Sumber Informasi 1"
 *                 - factId: 2
 *                   fact: "Informasi Fakta Kesehatan 2"
 *                   source: "Sumber Informasi 2"
 *                 # ... tambahkan lebih banyak data sesuai kebutuhan
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pengguna berhasil didaftarkan
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'User created successfully'
 *               data:
 *                 name: "Nama Pengguna"
 *                 email: "email@example.com"
 *       400:
 *         description: Email sudah ada atau password tidak cocok
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Email already exist atau Password do not match'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Melakukan login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Berhasil login, mengembalikan token akses
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "access-token"
 *       400:
 *         description: Email tidak ditemukan atau kredensial tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Invalid credentials atau Email is not found'
 *               errormessage: "Detail kesalahan jika ada"
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /refreshToken:
 *   get:
 *     summary: Memperbarui token akses dengan refreshToken
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token akses berhasil diperbarui
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               accessToken: "access-token"
 *       401:
 *         description: Akses ditolak, refreshToken tidak ada
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Access denied, token missing!'
 *       403:
 *         description: Pengguna tidak terotentikasi
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'User not authenticated!'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Melakukan logout pengguna
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout berhasil
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Logout success!'
 *       204:
 *         description: Pengguna tidak terotentikasi atau refreshToken tidak ada
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'User not authenticated!'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Mereset kata sandi pengguna dan mengirimkan kata sandi baru melalui email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kata sandi berhasil direset dan dikirimkan melalui email
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Password has been reset'
 *               data:
 *                 email: "email@example.com"
 *                 password: "new-password"
 *       400:
 *         description: Email tidak ditemukan atau terjadi kesalahan lainnya
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Email not found atau Something went wrong'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /upload/{id}:
 *   post:
 *     summary: Mengunggah gambar profil pengguna
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Gambar berhasil diunggah
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Image uploaded.'
 *               data:
 *                 userId: "user-id"
 *                 profilePic: "https://storage.googleapis.com/bucket-name/file-name.png"
 *       400:
 *         description: Harap berikan semua detail yang diperlukan atau kesalahan lainnya
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Please provide all the required details'
 *       401:
 *         description: Akses ditolak, token akses tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Access token not found'
 *       403:
 *         description: Token akses tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Invalid token'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Internal Server Error'
 */

/**
 * @swagger
 * /Nutrisions:
 *   get:
 *     summary: Mendapatkan daftar informasi nutrisi
 *     tags: [Nutrition]
 *     responses:
 *       200:
 *         description: Informasi nutrisi berhasil diambil
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Nutrisions fetched successfully'
 *               data:
 *                 - nutrisionId: 1
 *                   name: "Nutrisi 1"
 *                   description: "Deskripsi Nutrisi 1"
 *                   createdAt: "2023-01-01T12:00:00Z"
 *                   updatedAt: "2023-01-02T14:30:00Z"
 *                 - nutrisionId: 2
 *                   name: "Nutrisi 2"
 *                   description: "Deskripsi Nutrisi 2"
 *                   createdAt: "2023-01-03T08:45:00Z"
 *                   updatedAt: "2023-01-04T10:20:00Z"
 *                 # ... tambahkan lebih banyak data sesuai kebutuhan
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /Nutrisions:
 *   post:
 *     summary: Menambahkan informasi nutrisi baru
 *     tags: [Nutrition]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informasi nutrisi berhasil ditambahkan
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Nutrisions created successfully'
 *               data:
 *                 nutrisionId: 1
 *                 name: "Nutrisi Baru"
 *                 description: "Deskripsi Nutrisi Baru"
 *                 createdAt: "2023-01-05T09:15:00Z"
 *                 updatedAt: "2023-01-05T09:15:00Z"
 *       400:
 *         description: Harap berikan semua detail yang diperlukan atau kesalahan lainnya
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Please provide all the required details'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /meals/{id}:
 *   get:
 *     summary: Mendapatkan daftar makanan untuk pengguna berdasarkan ID
 *     tags: [Meal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar makanan berhasil diambil
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Meals for userId {userId}'
 *               data:
 *                 - mealId: 1
 *                   meals_name: "Meal 1"
 *                   calories: 300
 *                 - mealId: 2
 *                   meals_name: "Meal 2"
 *                   calories: 500
 *                 # ... tambahkan lebih banyak data sesuai kebutuhan
 *       400:
 *         description: Permintaan tidak valid karena parameter userId tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Bad Request'
 *               data: 'userId parameter is missing in the request.'
 *       401:
 *         description: Akses ditolak, token akses tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Access token not found'
 *       403:
 *         description: Token akses tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Invalid token'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Internal Server Error'
 */

/**
 * @swagger
 * /addmeal/{id}:
 *   post:
 *     summary: Menambahkan informasi makanan untuk pengguna berdasarkan ID
 *     tags: [Meal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meals_name:
 *                 type: string
 *               calories:
 *                 type: number
 *               carbs:
 *                 type: number
 *               proteins:
 *                 type: number
 *               fats:
 *                 type: number
 *               minerals:
 *                 type: number
 *     responses:
 *       200:
 *         description: Informasi makanan berhasil ditambahkan
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Meal added successfully by {userId}'
 *               data:
 *                 userId: "user-id"
 *                 meals:
 *                   mealId: 1
 *                   meals_name: "Meal 1"
 *                   calories: 300
 *                   carbs: 20
 *                   proteins: 15
 *                   fats: 10
 *                   minerals: 5
 *       400:
 *         description: Permintaan tidak valid karena parameter userId tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Bad Request'
 *               data: 'userId parameter is missing in the request.'
 *       401:
 *         description: Akses ditolak, token akses tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Access token not found'
 *       403:
 *         description: Token akses tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Invalid token'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Internal Server Error'
 */

/**
 * @swagger
 * /deletemeal/{id}:
 *   post:
 *     summary: Menghapus informasi makanan untuk pengguna berdasarkan ID dan ID makanan
 *     tags: [Meal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Informasi makanan berhasil dihapus
 *         content:
 *           application/json:
 *             example:
 *               message: 'Meal deleted successfully'
 *               data:
 *                 meal: 1
 *       400:
 *         description: Permintaan tidak valid karena parameter userId atau mealId tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Bad Request'
 *               data: 'userId or mealId parameter is missing in the request.'
 *       401:
 *         description: Akses ditolak, token akses tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Access token not found'
 *       403:
 *         description: Token akses tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Invalid token'
 *       404:
 *         description: Makanan tidak ditemukan untuk pengguna yang diberikan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Not Found'
 *               data: 'Meal not found'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Internal Server Error'
 */

/**
 * @swagger
 * /calculatemealsday/{id}:
 *   get:
 *     summary: Menghitung total kalori, karbohidrat, protein, lemak, dan mineral dari makanan pada hari ini untuk pengguna berdasarkan ID
 *     tags: [Meal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID pengguna
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Total kalori, karbohidrat, protein, lemak, dan mineral berhasil dihitung
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               message: 'Meals for userId {userId}'
 *               data:
 *                 getMealsByday:
 *                   calories: 1200
 *                   carbs: 150
 *                   proteins: 80
 *                   fats: 50
 *                   minerals: 30
 *       400:
 *         description: Permintaan tidak valid karena parameter userId tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Bad Request'
 *               data: 'userId parameter is missing in the request.'
 *       401:
 *         description: Akses ditolak, token akses tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Access token not found'
 *       403:
 *         description: Token akses tidak valid
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               msg: 'Invalid token'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: true
 *               message: 'Internal Server Error'
 */

