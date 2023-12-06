// // callback hell

// // const getRollNo = () => {
// //   setTimeout(() => {
// //     const rollno = [37, 46, 73, 61, 63, 83];
// //     console.log(rollno);
// //     setTimeout(
// //       (rollno) => {
// //         const studentData = {
// //           name: "Hitesh",
// //           age: 21,
// //         };
// //         const { name, age } = studentData;
// //         console.log(
// //           `my roll no is ${rollno}, my name is ${name} and i am ${age} years old`
// //         );
// //         setTimeout(
// //           (studentData) => {
// //             const gender = "Male";
// //             console.log(`my name is ${name},i am ${gender}`);
// //           },
// //           2000,
// //           studentData
// //         );
// //       },
// //       2000,
// //       rollno[1]
// //     );
// //   }, 2000);
// // };
// // getRollNo();

// // promises

// // const probj = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     const rollNo = [2, 6, 26, 47];
// //     // console.log(rollNo);
// //     resolve(rollNo);
// //     reject("Data Not Found");
// //   }, 2000);
// // });

// // const stuData = (studentId) => {
// //   const sData = new Promise(
// //     (resolve, reject) => {
// //       const studentDetails = {
// //         name: "Hitesh",
// //         age: 21,
// //       };
// //       const { name, age } = studentDetails;
// //       resolve(
// //         `my roll no is ${studentId}, my name is ${name} and i am ${age} years old`
// //       );
// //       reject("student data is not found");
// //     },
// //     2000,
// //     studentId
// //   );
// //   return sData;
// // };

// // probj
// //   .then((data) => {
// //     console.log(data);
// //     return stuData(data[1]);
// //   })
// //   .then((qw) => {
// //     console.log(qw);
// //   })
// //   .catch((error) => {
// //     console.log("DATA NOT FOUND", error);
// //   });

// const arr = [1, 9, 6, 3, 2, 8];
// const size = 2;
// const finalArray = [];
// for (let i = 0; i < arr.length / size; i++) {
//   const prefinal = [];
//   const startIndex = i * size;
//   for (let j = 0; j < size && startIndex + j < arr.length; j++) {
//     prefinal.push(arr[startIndex + j]);
//   }
//   finalArray.push(prefinal);
// }
// console.log("Result", JSON.stringify(finalArray, 2));

// const filename = imagesData[j].filename;
//                 const pathofFile = await this.checkImageInFolder(
//                   filename,
//                   vendorCode,
//                 );
//                 if (pathofFile !== null) {
//                   const imageUpload = await uploadFileToS3(
//                     pathofFile,
//                     `product-images/${filename}`,
//                   );
//                   if (imageUpload !== null) {
//                     imagesforRow.push({
//                       product_id: productId,
//                       path: imageUpload.toString(),
//                       type: imagesData[j].type,
//                       is_video: 0,
//                       video_path: '',
//                       filename: filename,
//                       audit: {
//                         created_by: userdata.id,
//                         updated_by: userdata.id,
//                       },
//                     });

//  async uploadProduct(
//     file: any,
//     userdata: any,
//     vendor_id: number,
//     country,
//     counter = 0,
//     success_count = 0,
//     error_count = 0,
//     success_result = [],
//     error_result = [],
//   ) {
//     const { originalname, path } = file;
//     const inputStream = createReadStream(path);
//     const jsonArray = await csvtojson().fromFile(path);
//     const queryRunner = this.connection.createQueryRunner();
//     await queryRunner.connect();
//     const vendorCode = await this.vendorCode(vendor_id);
//     const i = counter;
//     console.log('json array len', jsonArray.length);
//     if (jsonArray && jsonArray.length > 0) {
//       const fileUploadStatusOrignal = await uploadFileFromPath(
//         inputStream,
//         `product-bulk-upload/${Math.round(+new Date() / 1000)}_${originalname}`,
//       );

//       let errorCount = 0;
//       let exception_file_url = '';

//       try {
//         const jsonCount = jsonArray.length;
//         if (i < jsonCount) {
//           const checkProduct = await this.productRepository
//             .createQueryBuilder()
//             .select(['id'])
//             .where({ title: jsonArray[i].title });
//           const checkProductExists = await checkProduct.getRawOne();
//           const checkSku =
//             await this.ProductPriceRepository.createQueryBuilder()
//               .select(['id'])
//               .where({ sku: jsonArray[i].sku });
//           const checkSkuExists = await checkSku.getRawOne();
//           if (!checkProductExists) {
//             queryRunner.startTransaction();

//             if (!checkSkuExists) {
//               const linkProducts = { '': 0, yes: 1, no: 0 };
//               const countryData = country.split(',').map(Number);
//               const productDetails = {
//                 title: jsonArray[i].title,
//                 description: jsonArray[i].description,
//                 product_code: await productCode(this.productRepository),
//                 sku: jsonArray[i].sku,
//                 upsell: linkProducts[jsonArray[i].show_upsell],
//                 cross_sell: linkProducts[jsonArray[i].show_cross_sell],
//                 is_visible: linkProducts[jsonArray[i].is_visible],
//                 usertype: userdata.usertype,
//                 country: `[${countryData}]`,
//                 status: '0',
//               };

//               productDetails['audit'] = {
//                 created_by: userdata.id,

//                 updated_by: userdata.id,
//               };

//               const product = await queryRunner.manager.save(
//                 Product,
//                 productDetails,
//               );
//               const productId = product.id;
//               if (!product) {
//                 errorCount++;
//               }
//               const warehouse = `Select id from mp_warehouse where vendor_id=${vendor_id} AND is_default='1' AND is_deleted='0'`;
//               const warehouseIds = await queryRunner.manager.query(warehouse);
//               const vendorData = {
//                 product_id: productId,
//                 vendor_id: vendor_id,
//                 vendor_sku: jsonArray[i].vendor_sku,
//                 warehouse_id: warehouseIds[0].id,
//               };
//               // console.log('hitesh', vendorData);

//               vendorData['audit'] = {
//                 created_by: userdata.id,
//                 updated_by: userdata.id,
//               };

//               await queryRunner.manager.save(ProductVendors, vendorData);
//               const attributeData = await this.attributesDetail(
//                 productId,
//                 Object.keys(jsonArray[i]),
//                 Object.values(jsonArray[i]),
//               );

//               // console.log('attributeData', attributeData);

//               if (attributeData.length > 0) {
//                 const attributesArray = attributeData;
//                 const saveDataArray = [];
//                 if (attributesArray.length > 0) {
//                   for (let i = 0; i < attributesArray.length; i++) {
//                     attributesArray[i]['audit'] = {
//                       created_by: userdata.id,
//                       updated_by: userdata.id,
//                     };

//                     attributesArray[i].product_id = productId;
//                     await product_attributes_value.validate(attributesArray[i]);
//                     const checkAlreadyExistQuery =
//                       await this.productAttributeValRepository
//                         .createQueryBuilder()
//                         .select([])
//                         .where({
//                           product_id: productId,
//                           attribute_id: attributesArray[i].attribute_id,
//                         });

//                     const checkAlreadyExistResult =
//                       await checkAlreadyExistQuery.getRawMany();

//                     if (checkAlreadyExistResult.length > 0) {
//                       const updateAttributeValue = {
//                         attribute_value: attributesArray[i].attribute_value,
//                       };

//                       updateAttributeValue['audit'] = {
//                         updated_by: userdata.id,
//                       };

//                       this.productAttributeValRepository.update(
//                         {
//                           product_id: productId,
//                           attribute_id: attributesArray[i].attribute_id,
//                         },
//                         updateAttributeValue,
//                       );
//                     } else {
//                       saveDataArray.push(
//                         this.productAttributeValRepository.create(
//                           attributesArray[i],
//                         ),
//                       );
//                     }
//                   }

//                   if (saveDataArray.length > 0) {
//                     const addData = await queryRunner.manager.save(
//                       ProductAttributeValue,
//                       saveDataArray,
//                     );
//                   }
//                 }
//               }

//               const categoryNames = jsonArray[i].category.split(',');
//               if (categoryNames && categoryNames.length > 0) {
//                 const categoryIdsArray = [];

//                 for (let i = 0; i < categoryNames.length; i++) {
//                   const getCategoryIdByName = await this.categoryRepository
//                     .createQueryBuilder()
//                     .select(['id'])
//                     .where({ category_name: categoryNames[i] })
//                     .getRawOne();
//                   if (getCategoryIdByName) {
//                     categoryIdsArray.push(getCategoryIdByName.id);
//                   }
//                 }

//                 if (categoryIdsArray.length > 0) {
//                   await this.productsService.productcategory(
//                     categoryIdsArray,
//                     productId,
//                     userdata,
//                   );
//                 }
//               }

//               const imagesData = await this.imagesDetail(
//                 Object.keys(jsonArray[i]),
//                 Object.values(jsonArray[i]),
//               );

//               const imagesforRow = [];

//               for (let j = 0; j < imagesData.length; j++) {
//                 const filename = imagesData[j].filename;

//                 const pathofFile = await this.checkImageInFolder(
//                   filename,
//                   vendorCode,
//                 );

//                 if (pathofFile !== null) {
//                   const imageUpload = await uploadFileToS3(
//                     pathofFile,
//                     `product-images/${filename}`,
//                   );

//                   if (imageUpload !== null) {
//                     imagesforRow.push({
//                       product_id: productId,
//                       path: imageUpload.toString(),
//                       type: imagesData[j].type,
//                       is_video: 0,
//                       video_path: '',
//                       filename: filename,
//                       audit: {
//                         created_by: userdata.id,
//                         updated_by: userdata.id,
//                       },
//                     });
//                     // console.log(imageUpload);
//                     await this.ProductImagesRepository.save(imagesforRow);
//                   }
//                 } else {
//                 }
//               }
//             } else {
//               error_result.push({
//                 sku: jsonArray[i].sku,
//                 error: 'sku already exist',
//               });
//               return await this.uploadProduct(
//                 file,
//                 userdata,
//                 vendor_id,
//                 country,
//                 i + 1,
//                 error_count + 1,
//                 success_count,
//                 success_result,
//               );
//             }
//           } else {
//             error_result.push({
//               sku: jsonArray[i].sku,
//               error: 'product title already exist',
//             });

//             return await this.uploadProduct(
//               file,
//               userdata,
//               vendor_id,
//               country,
//               i + 1,
//               error_count + 1,
//               success_count,
//               success_result,
//             );
//           }
//           queryRunner.commitTransaction();
//           success_result.push(jsonArray[i]);
//           return await this.uploadProduct(
//             file,
//             userdata,
//             vendor_id,
//             country,
//             i + 1,
//             error_count,
//             success_count + 1,
//             success_result,
//           );
//         } else {
//           if (error_result.length > 0) {
//             const sheetOptions = {
//               '!cols': [{ wch: 7 }, { wch: 10 }, { wch: 20 }],
//             };
//             const ProductData = [[...PRODUCT_EXCP], ...error_result];

//             const failedFile = await xlsx.build(
//               [{ name: 'mySheetName', data: ProductData, options: {} }],
//               {
//                 sheetOptions,
//               },
//             );

//             const fileUploadStatus = await uploadFileArrayBuffer(
//               failedFile,
//               `product-bulk-upload/${Math.round(
//                 +new Date() / 1000,
//               )}_failed_.xlsx`,
//               'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//             );
//             exception_file_url = fileUploadStatus.Key;
//           }

//           const logAddingData = {
//             original_file_url: fileUploadStatusOrignal.Key,
//             success_count: success_count,
//             error_count: error_count,
//             exception_file_url: exception_file_url,
//             original_file_name: originalname,
//             exception_file_name: `${originalname}_failed.xlsx`,
//           };

//           logAddingData['audit'] = {
//             created_by: userdata.id,
//             updated_by: userdata.id,
//           };

//           const logData = await this.loggingProductsBulkUploadRepository.save(
//             logAddingData,
//           );

//           return { status: 'success', data: logData };
//         }
//       } catch (error) {
//         queryRunner.rollbackTransaction();
//         error_result.push({ sku: jsonArray[i].sku, error: error });
//         return await this.uploadProduct(
//           file,
//           userdata,
//           vendor_id,
//           country,
//           i + 1,
//           error_count + 1,
//           success_count,
//           success_result,
//         );
//       }
//     } else {
//       return { status: 'error', message: 'empty file uploaded' };
//     }
//   }

//     const query = await this.productRepository.createQueryBuilder('p');
//     query.select([
//       'p.id as id',
//       'p.product_code as product_code',
//       'p.title as title',
//       'p.sku as sku',
//       'img.path as image',
//       'p.product_type as product_type',
//       'vd.vendor_name as vendor_name',
//       'p.master_product as master_product',
//       'p.status as status',
//       'pp.product_price as product_price',
//       'mw.name as warehouse_name',
//     ]);
//     query.innerJoin('mp_product_vendors', 'pv', 'pv.product_id=p.id');
//     query.leftJoin('mp_warehouse', 'mw', 'pv.warehouse_id=mw.id');
//     query.innerJoin('mp_vendor', 'vd', 'vd.id=pv.vendor_id');
//     query.leftJoin('mp_product_images', 'img', 'img.product_id=p.id');
//     query.leftJoin('mp_mapping_product_price', 'pp', 'pp.product_id=p.id');
//     if (id) {
//       query.andWhere('p.id =:id', { id: id });
//     }

//     if (is_rejected && is_rejected == '1') {
//       console.log('is_rejected :>> ', is_rejected);
//       const rawSql = `SELECT product_id FROM ${TBL_PREFIX}rejected_products`;
//       const result = await this.rejectedProductsRepository.query(rawSql);
//       const productIds = await result.map((row) => row.product_id);
//       query.andWhere('p.id IN(:...productIds)', {
//         productIds: productIds,
//       });
//     }

//     if (type) {
//       query.andWhere('p.product_type =:product_type', { product_type: type });
//     }
//     // console.log('vendor_id :>> ', vendor_id);
//     // if (vendor_id && vendor_id.length > 0) {
//     //   query.andWhere('p.vendor_id IN(:...vendor_id)', {
//     //     vendor_id: vendor_id,
//     //   });
//     // }
//     if (vendor_id && vendor_id.length > 0) {
//       if (Array.isArray(vendor_id)) {
//         query.andWhere('p.vendor_id IN (:...vendor_id)', {
//           vendor_id: vendor_id,
//         });
//       } else {
//         query.andWhere('pv.vendor_id = :vendor_id', { vendor_id: vendor_id });
//       }
//     }

//     if (title) {
//       query.andWhere('p.title LIKE:title', {
//         title: `%${title}%`,
//       });
//     }

//     if (sku) {
//       query.andWhere('p.sku = :sku', {
//         sku: sku,
//       });
//     }

//     if (master_product) {
//       query.andWhere('p.master_product = :master_product', {
//         master_product: master_product,
//       });
//     }

//     let finalVendorId = 0;
//     if (userdata.backend_usertype != 'admin' && !master_product) {
//       const queryRunner = this.connection.createQueryRunner();
//       await queryRunner.connect();
//       const userid = userdata.id;
//       finalVendorId = userid;
//       if (userdata.backend_usertype == 'vendor') {
//         query.andWhere('pv.vendor_id = :userid', {
//           userid: userid,
//         });
//       }

//       if (userdata.backend_usertype == 'vendor_user') {
//         const rawQuery = `select parent_id from mp_vendor_users where id=${userid} limit 1`;
//         const result = await queryRunner.query(rawQuery);
//         if (result) {
//           const userid = result[0]['parent_id'];
//           finalVendorId = userid;
//           query.andWhere('pv.vendor_id = :userid', {
//             userid: userid,
//           });
//         }
//         await queryRunner.release();
//       }

//       if (userdata.backend_usertype == 'warehouse') {
//         const rawQuery = `select vendor_id from mp_warehouse where id=${userid} limit 1`;
//         const result = await queryRunner.query(rawQuery);
//         if (result) {
//           const warehouse_id = userid;
//           const vendor_id = result[0]['vendor_id'];
//           finalVendorId = vendor_id;
//           query.andWhere('pv.vendor_id = :vendor_id', {
//             vendor_id: vendor_id,
//           });
//           if (master_product) {
//             query.andWhere('pv.vendor_id! = :vendor_id', {
//               vendor_id: vendor_id,
//             });
//           }
//           query.andWhere('pv.warehouse_id = :warehouse_id', {
//             warehouse_id: warehouse_id,
//           });
//         }
//         await queryRunner.release();
//       }

//       if (userdata.backend_usertype == 'warehouse_user') {
//         const rawQuery = `select vendor_id from mp_warehouse where id=(
//           select parent_id from mp_vendor_users where id=${userid} and user_type="0") limit 1;`;
//         const result = await queryRunner.query(rawQuery);
//         const rawQueryForParent = `select parent_id from mp_vendor_users where id=${userid} and user_type="0" limit 1;`;
//         const resultParent = await queryRunner.query(rawQueryForParent);
//         if (result) {
//           const userid = result[0]['vendor_id'];
//           finalVendorId = userid;
//           const warehouse_id = resultParent[0]['parent_id'];
//           query.andWhere('pv.vendor_id = :userid', {
//             userid: userid,
//           });
//           if (master_product) {
//             query.andWhere('pv.vendor_id! = :userid', {
//               userid: userid,
//             });
//           }
//           query.andWhere('pv.warehouse_id = :warehouse_id', {
//             warehouse_id: warehouse_id,
//           });
//         }
//         await queryRunner.release();
//       }
//     } else {
//       if (master_product) {
//         const queryRunner = this.connection.createQueryRunner();
//         await queryRunner.connect();
//         const userid = userdata.id;
//         finalVendorId = userid;

//         if (userdata.backend_usertype == 'vendor_user') {
//           const rawQuery = `select parent_id from mp_vendor_users where id=${userid} limit 1`;
//           const result = await queryRunner.query(rawQuery);
//           if (result) {
//             const userid = result[0]['parent_id'];
//             finalVendorId = userid;
//           }
//           await queryRunner.release();
//         }

//         if (userdata.backend_usertype == 'warehouse') {
//           const rawQuery = `select vendor_id from mp_warehouse where id=${userid} limit 1`;
//           const result = await queryRunner.query(rawQuery);
//           if (result) {
//             const warehouse_id = userid;
//             const vendor_id = result[0]['vendor_id'];
//             finalVendorId = vendor_id;
//           }
//           await queryRunner.release();
//         }

//         if (userdata.backend_usertype == 'warehouse_user') {
//           const rawQuery = `select vendor_id from mp_warehouse where id=(
//           select parent_id from mp_vendor_users where id=${userid} and user_type="0") limit 1;`;
//           const result = await queryRunner.query(rawQuery);
//           const rawQueryForParent = `select parent_id from mp_vendor_users where id=${userid} and user_type="0" limit 1;`;
//           const resultParent = await queryRunner.query(rawQueryForParent);
//           if (result) {
//             const userid = result[0]['vendor_id'];
//             finalVendorId = userid;
//           }
//           await queryRunner.release();
//         }
//         query.andWhere('pv.vendor_id!= :finalVendorId', {
//           finalVendorId: finalVendorId,
//         });
//       }
//     }

//     commonFilterWithoutJoin(productFilterDto, query, '1', 'p');
//     const total = await query.getCount();
//     commonLimit(productFilterDto, query);
//     //for not show dublicate products
//     query.groupBy('p.id');

//     SELECT `p`.`id` as id, `p`.`product_code` as product_code, `p`.`title` as title, `p`.`sku` as sku,
//  `img`.`path` as image, `p`.`product_type` as product_type, vd.vendor_name as vendor_name,
//  `p`.`master_product` as master_product, `p`.`status` as status,
//  `pp`.`product_price` as product_price, mw.name as warehouse_name
//  FROM fermion_marketplace.mp_products `p`
//  INNER JOIN fermion_marketplace.mp_product_vendors `pv` ON `pv`.`product_id`=`p`.`id`
//  LEFT JOIN fermion_marketplace.mp_warehouse `mw` ON `pv`.`warehouse_id`=mw.id
//  INNER JOIN fermion_marketplace.mp_vendor `vd` ON vd.id=`pv`.`vendor_id`
//  LEFT JOIN fermion_marketplace.mp_product_images `img` ON `img`.`product_id`=`p`.`id`
//  LEFT JOIN fermion_marketplace.mp_mapping_product_price `pp` ON `pp`.`product_id`=`p`.`id`
//  WHERE `pv`.`vendor_id` = 24 AND `pv`.`warehouse_id` = 33 AND `p`.`is_deleted` = '0'
// GROUP BY `p`.`id` ORDER BY 1 DESC LIMIT 20

// {
//     status: '2',
//     current_status: '1',
//     order_id: '1016',
//     sub_order_id: '100010',
//     remark: 'picked',
//     level: 'order',
//     awb_number: ''
//   },
//   {
//     status: '2',
//     current_status: '1',
//     order_id: '1016',
//     sub_order_id: '100009',
//     remark: 'picked',
//     level: 'order',
//     awb_number: ''
//   }
// }

// [37, 46, 73, 61,37, 56,46,37, 73,72, 63, 83]
exports.demofile = () => {
  const numbers = [37, 46, 73, 61, 37, 56, 72, 46, 37, 73, 63, 83];
  const countMap = {};
  const data = [];
  numbers.map((num) => {
    if (countMap[num]) {
      countMap[num]++;
      if (countMap[num] >= 2) {
        data.push({ count: countMap[num], num: num });
      }
    } else {
      // console.log("Is Not ");
      countMap[num] = 1;
    }
  });
  return countMap;
  // for (const [number, count] of Object.entries(countMap)) {
  //   if (count >= 2) {
  //     data.push({ count, number });
  //   }
  //   // console.log(`Number ${number} occurs ${count} times.`);
  // }
  // console.log(JSON.stringify(data), "data");
};
// console.log(demofile());
// exports.demo = demofile();
// exports { demo };
