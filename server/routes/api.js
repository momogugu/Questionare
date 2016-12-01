import db from '../models/index'
import moment from 'moment';
import webtoken from 'jsonwebtoken';

const {
	User,
	Project
} = db;

export default function (Router) {
	const router = new Router({
		prefix: '/api'
	});
	router.get('/valid', async function() {
		const accessToken = this.headers['x-access-token'];
		const token = accessToken;
		const decoded = webtoken.verify(token, 'keys');
		if (decoded.exp <= Date.now()) {
			this.body = {
				error: '登录状态已过期，请重新登录'
			};
			return;
		}
		if (decoded) {
			this.body = {
				token,
				error: '',
				success: '登录成功'
			};
			return;
		}
	});
	router.post('/login', async function() {
		let body = this.request.body;
		let {
			email,
			password
		} = body;
		let authInfo = await User.getAuth(email);
		if (!authInfo) {
			this.body = {
				error: '账号不存在'
			};
			this.status = 401;
			return;
		} 
		if (password !== authInfo.password) {
			this.body = {
				error: '密码错误'
			};
			this.status = 401;
			return;
		}
		let userInfo = await User.getInfo({
			email: email
		});
		let playload = {
			user: userInfo
		};
		let expires = moment().add(7, 'days').valueOf();
		let token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '登陆成功',
        };
	});
	router.post('/register', async function() {
		const body = this.request.body;
		const {
			email
		} = body;
		const authInfo = await User.getAuth(email);
		if (authInfo) {
			this.body = {
				error: '该邮箱已注册'
			};
			this.status = 401;
			return;
		}
		const newUser = await User.createUser(body);
		this.body = {
			success: '注册成功'
		};
	});
	router.post('/setting', async function() {
		const body = this.request.body;
		const updateInfo = await User.updateInfo(body);
		const userInfo = await User.getInfo({
			_id: body._id
		});
		const playload = {
			user: userInfo
		};
		const expires = moment().add(7, 'days').valueOf();
		const token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '修改信息成功',
        };
	});
	router.post('/projects', async function() {
		const body = this.request.body;
		const newProject = await Project.createProject(body);
		this.body = {
			project: newProject,
			success: '成功创建新问卷'
		};
	});
	router.get('/projects', async function() {
		const {
			userID
		} = this.query;
		let project = [];
		let publishedProject = [];
		if (userID) {
			project = await Project.getProjects({
				userID: userID
			});
			this.body = {
				project: project,
				success: '成功获取问卷列表'
			}
			return;
		} else {
			publishedProject = await Project.getProjects({
				status: '已发布'
			});
		}
			this.body = {
				publishedProject: publishedProject,
				success: '成功获取已发布问卷列表'
			}
	});
	router.get('/project/:_id', async function() {
		const {
			_id
		} = this.params;
		const project = await Project.getProject(_id);
		if (!project) {
			this.body = {
				error: 'project not found'
			};
			return;
		}
		project.views++;
		try {
			const body = {
				project: project,
				success: '成功获取问卷详细信息'
			};
			this.body = body;
			project.save();
		} catch(e) {
			this.status = 403;
			this.body = {
				error: 'err'
			};
		}
	});
	router.put('/project/:_id', async function() {
		const {
			_id
		} = this.params;
		const body = this.request.body;
		const result = await Project.updateProject(body);
        const project = await Project.getProject(_id);
        this.body = {
            project: project,
            success: '成功更新项目状态'
        };
	});
	router.delete('/project/:_id', async function() {
		const {
			_id
		} = this.params;
		const project = await Project.deleteProject(_id);
        console.log(project.result);

        this.body = {
            _id: _id,
            success: '成功删除项目'
        };
	})
	return router.routes();
}