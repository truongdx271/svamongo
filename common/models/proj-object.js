'use strict';

function updateMember(proj, data, cb) {
    for (let i = 0; i < data.projectMember.length; i++) {
        const element = data.projectMember[i];
        proj.projectMember.push(element)
    }
    return cb(proj);
}

function updateScan(proj, data, cb) {
    // console.log(proj);
    // console.log(data);
    proj.scans.push(data.scan);
    return cb(proj);
}


module.exports = function (Projobject) {

    //validate unique project

    Projobject.validatesUniquenessOf('projectName', { message: 'Project is not unique' });
    Projobject.validatesUniquenessOf('projectCode', { message: 'Project is not unique' });

    Projobject.addMember = function (data, cb) {
        Projobject.findOne({
            where: {
                id: data.id
            }
        }, (err, proj) => {
            updateMember(proj, data, (retProj) => {
                Projobject.upsert(retProj, (err, fproj) => {
                    if (err) return cb(err);
                    return cb(null, fproj);
                })
            })
        })
    }
    Projobject.remoteMethod('addMember', {
        accepts: {
            arg: 'members',
            type: 'object'
        },
        returns: {
            arg: 'proj',
            type: 'object'
        }
    })

    Projobject.addScan = function (data, cb) {
        // console.log(data.scan);
        // console.log(data.id);
        Projobject.findOne({
            where: {
                id: data.id
            }
        }, (err, proj) => {
            updateScan(proj, data, (retProj) => {
                Projobject.upsert(retProj, (err, fproj) => {
                    if (err) return cb(err);
                    return cb(null, fproj);
                })
            });
        })
    }
    Projobject.remoteMethod('addScan', {
        accepts: {
            arg: 'scan',
            type: 'object'
        },
        returns: {
            arg: 'proj',
            type: 'object'
        }
    })

};
