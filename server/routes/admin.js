const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const assert = require('http-assert')


// 登录校验中间件
const authMiddleware = require('../middleware/auth')

// 上传校验中间件
const resourceMiddleware = require('../middleware/resource')

module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 创建资源
    router.post('/', authMiddleware(), async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新资源
    router.put('/:id', authMiddleware(), async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除资源
    router.delete('/:id', authMiddleware(), async(req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 资源列表
    router.get('/', authMiddleware(), async(req, res) => {
        let queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 资源详情
    router.get('/:id', authMiddleware(), async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })


    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    app.post('/admin/api/login', async(req, res) => {
        const {
            username,
            password
        } = req.body
            //根据用户名找数据
        const user = await Admin.findOne({
            username
        }).select('+password')

        assert(user, 422, '用户不存在')

        // if (!user) {
        //     return res.status(422).send({

        //         message: '用户不存在'
        //     })
        // }

        //验证密码
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }

        // 返回token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({
            token
        });
    })

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
    })

}
