const partDAO = require('../dao/PartDAO');

class PartService {

    listParts(callback) {
        partDAO.listParts((parts) => {
            callback(parts);
        });
    }

    listMaterialsOfParts(callback) {
        partDAO.listMaterialsOfParts((materials) => {
            // Filter part documents to unique material array and exclude empty materials
            const materialArray = materials
                .map(material => material.material)
                .filter(material => material !== '')
                .filter((value, index, self) => self.indexOf(value) === index);
            callback(materialArray);
        });
    }

}

module.exports = new PartService();