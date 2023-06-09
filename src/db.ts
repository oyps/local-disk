import { Database } from 'sqlite3'
import { sendErr } from './util'
import { Response } from 'express'

/** 数据库配置 */
export const DATABASE_CONFIG = {
    /** 数据库名 */
    database: 'filelist.db',
    /** 数据表名 */
    table: 'filelist'
}

/**
 * 获取数据库连接
 * @param res 请求对象
 * @returns 数据库连接
 */
export function getConn(res: Response) {
    return new Promise<Database>((resolve) => {
        const conn = new Database(DATABASE_CONFIG.database, async (err) => {
            if (err) return sendErr(res, err.message)
            await initTable(conn)
            resolve(conn)
        })
    })
}

/**
 * 初始化数据表
 * @param conn 数据库连接
 * @returns 数据库连接
 */
function initTable(conn: Database) {
    return new Promise<Database>((resolve) => {
        conn.run(`CREATE TABLE IF NOT EXISTS "${DATABASE_CONFIG.table}" (
            "id" INTEGER NOT NULL,
            "parent_id" INT NOT NULL,
            "name" TEXT NOT NULL,
            "is_dir" INTEGER NOT NULL,
            "size" INTEGER NOT NULL,
            "object_id" TEXT,
            "upload_time" TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT),
            UNIQUE("parent_id", "name", "is_dir")
        )`, (error) => {
            if (error) console.log('数据表创建失败')
            resolve(conn)
        })
    })
}

/** 数据库中的文件信息 */
export type fileInfo = {
    /** 文件 ID */
    'id': number,
    /** 父文件夹 ID */
    'parent_id': number,
    /** 文件名 */
    'name': string,
    /** 是否是文件夹 */
    'is_dir': number,
    /** 文件大小 */
    'size': number,
    /** 文件对象 ID */
    'object_id': string,
    /** 上传时间 */
    'upload_time': string
}