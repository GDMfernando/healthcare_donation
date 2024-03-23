'use strict';
const {
    validateHospitalRegistration
} = require('./hospitals.request.validate');
const httpResponse = require('../../libs/api_response/http_response');
const hospitalService = require('../../services/hospital/hospital.service');
const userService = require('../../services/users/users.service');
const { encodeImageToBase64, hashPassword } = require('../../utils/helper.js');
const uuid = require('uuid');

async function hospitalRegister(req, res, next) {
    try {
        const validate = validateHospitalRegistration(req);
        if (!validate) {
            let userReqData = {
                username: req.body.username,
                password: await hashPassword(req.body.password),
                user_type: 'HOSPITAL_ADMIN',
                first_name: req.body.name,
                last_name: 'Admin',
                login_email: req.body.email,
                status: 'ACT',
                user_uuid: uuid.v4()
            };

            const hospitalAdminUserRegisterResp =
                await userService.registerUser(userReqData);
            if (hospitalAdminUserRegisterResp.success) {
                let hospitalReqData = {
                    name: req.body.name,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    username: req.body.username,
                    type: req.body.type,
                    description: req.body.description,
                    image: req.file ? req.file.filename : null
                };

                const hospitalRegisterResp =
                    await hospitalService.registerHospital(hospitalReqData);
                if (hospitalRegisterResp.success) {
                    httpResponse.success(
                        res,
                        'Successfully Registered',
                        hospitalAdminUserRegisterResp.data
                    );
                } else {
                    httpResponse.failed(res, 'Hospital registration error');
                }
            } else {
                httpResponse.failed(
                    res,
                    'Hospital admin user registration error'
                );
            }
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {
        throw error;
    }
}

async function hospitalUpdate(req, res, next) {
    try {
        let hospitalId = req.params.id;
        // const validate = validateHospitalRegistration(req);
        if (true) {
            let hospitalReqData = {
                name: req.body.name,
                address: req.body.address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                type: req.body.type,
                description: req.body.description,

            };
            const hospitalUpdateResp = await hospitalService.updateHospital(
                hospitalId,
                hospitalReqData
            );
            if (hospitalUpdateResp.success) {
                httpResponse.success(
                    res,
                    'Successfully updated',
                    hospitalUpdateResp.data
                );
            } else {
                httpResponse.failed(
                    res,
                    'Internal server error : Hospital update failed'
                );
            }
        } else {
            httpResponse.failed(res, validate);
        }
    } catch (error) {
        throw error;
    }
}

async function getHospitalById(req, res, next) {
    try {
        let hospitalId = req.params.id;
        const getHospitalResp = await hospitalService.findHospitalById(
            hospitalId
        );
        if (getHospitalResp.success) {
            getHospitalResp.data = {
                ...getHospitalResp.data,
                image_base64: getHospitalResp.data.image
                    ? encodeImageToBase64(
                          'uploads/' + getHospitalResp.data.image
                      )
                    : null
            };
            httpResponse.success(res, 'Successfully', getHospitalResp.data);
        } else {
            httpResponse.failed(res, getHospitalResp.error);
        }
    } catch (error) {
        throw error;
    }
}

async function getAllHospitals(req, res, next) {
    try {
        const getAllHospitalResp = await hospitalService.getAllHospitals();
        if (
            getAllHospitalResp.success &&
            getAllHospitalResp.data &&
            getAllHospitalResp.data.length > 0
        ) {
            getAllHospitalResp.data.forEach((hospital) => {
                hospital['image_base64'] = hospital.image
                    ? encodeImageToBase64('uploads/' + hospital.image)
                    : null;
            });
            httpResponse.success(res, 'Successfully', getAllHospitalResp.data);
        } else {
            httpResponse.failed(res, getAllHospitalResp.error);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteHospitalById(req, res, next) {
    try {
        let hospitalId = req.params.id;
        const getHospitalResp = await hospitalService.deleteHospitalById(
            hospitalId
        );
        if (getHospitalResp.success) {
            httpResponse.success(
                res,
                'Deleted Successfully',
                getHospitalResp.data
            );
        } else {
            httpResponse.failed(res, getHospitalResp.error);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hospitalRegister,
    hospitalUpdate,
    getHospitalById,
    getAllHospitals,
    deleteHospitalById
};
