class Converter {
    constructor() {
        this.units = ['CERO', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
        this.tenToSixteen = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS'];
        this.tens = ['TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
        this.elMessage = document.getElementById('message');
        this.addListener();
    }

    addListener() {
        let elInput = document.getElementById('field-number');
        elInput.addEventListener('keyup', () => {
            if (elInput.value !== '') {
                this.convertToText(elInput.value);

            } else {
                this.elMessage.innerText = '';
            }
        });
    }

    convertToText(number) {
        number = this.deleteZerosLeft(number);

        this.elMessage.innerText = this.getName(number);
    }

    // Elimina los ceros a la izquierda
    deleteZerosLeft(number) {
        let i = 0;
        let isZero = true;
        for (i = 0; i < number.length; i++) {
            if (number.charAt(i) != 0) {
                isZero = false;
                break;
            }
        }
        return isZero ? '0' : number.substr(i);
    }

    validateNumber(number) {
        // Validar que la cadena sea un número y que no esté vacía
        if (isNaN(number) || number === '') {
            return false;
        }
        // Validar que no tenga punto decimal
        if (number.indexOf('.') >= 0) {
            return false;
        }
        // Validar que el número no sea negativo
        if (number.indexOf('-') >= 0) {
            return false;
        }
        return true;
    }

    getName(number) {
        number = this.deleteZerosLeft(number);

        if (number.length === 1) {
            return this.getUnits(number);
        }
        if (number.length === 2) {
            return this.getTens(number);
        }
        if (number.length === 3) {
            return this.getHundreds(number);
        }
        if (number.length < 7) {
            return this.getThousands(number);
        }
        if (number.length < 13) {
            return this.getPeriod(number, 6, 'MILLÓN');
        }
        if (number.length < 19) {
            return this.getPeriod(number, 12, 'BILLÓN');
        }
        return 'Número demasiado grande.';
    }

    getUnits(number) {
        let numberInt = parseInt(number);
        return this.units[numberInt];
    }

    getTens(number) {
        // Obtener las unidades
        let units = number.charAt(1);

        if (number < 17) {
            return this.tenToSixteen[number - 10];
        }
        if (number < 20) {
            return 'DIECI' + this.getUnits(units);
        }
        // Nombres especiales
        switch (number) {
            case '20':
                return 'VEINTE';
            case '22':
                return 'VEINTIDÓS';
            case '23':
                return 'VEINTITRÉS';
            case '26':
                return 'VEINTISÉIS';
        }
        if (number < 30) {
            return 'VEINTI' + this.getUnits(units);
        }
        let name = this.tens[number.charAt(0) - 3];
        if (units > 0) {
            name += ' Y ' + this.getUnits(units);
        }
        return name;
    }

    getHundreds(number) {
        let name = '';
        // Obtener las centenas
        let hundreds = number.charAt(0);
        // Obtener las decenas y unidades
        let tens = number.substr(1);

        if (number == 100) {
            return 'CIEN';
        }
        // Nombres especiales
        switch(hundreds) {
            case '1':
                name = 'CIENTO';
                break;
            case '5':
                name = 'QUINIENTOS';
                break;
            case '7':
                name = 'SETECIENTOS';
                break;
            case '9':
                name = 'NOVECIENTOS';
        }
        if (name === '') {
            name = this.getUnits(hundreds) + 'CIENTOS';
        }
        if (tens > 0) {
            name += ' ' + this.getName(tens);
        }
        return name;
    }

    getThousands(number) {
        let name = 'MIL';
        // Obtener cuantos dígitos están en los miles
        let thousandsLength = number.length - 3;
        // Obtener los miles
        let thousands = number.substr(0, thousandsLength);
        // Obtener las centenas, decenas y unidades
        let hundreds = number.substr(thousandsLength);

        if (thousands > 1) {
            // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
            name = this.getName(thousands).replace('UNO', 'UN') + ' MIL';
        }
        if (hundreds > 0) {
            name += ' ' + this.getName(hundreds);
        }
        return name;
    }

    // Obtiene periodos, por ejemplo: millones, billones, etc.
    getPeriod(number, digitsToTheRight, periodName) {
        let name = 'UN ' + periodName;
        // Obtener cuantos dígitos están dentro del periodo
        let periodLength = number.length - digitsToTheRight;
        // Obtener los dítos del periodo
        let periodDigits = number.substr(0, periodLength);
        // Obtener los digitos previos al periodo
        let previousDigits = number.substr(periodLength);

        if (periodDigits > 1) {
            name = this.getName(periodDigits).replace('UNO', 'UN') + ' ' + periodName.replace('Ó', 'O') + 'ES';
        }
        if (previousDigits > 0) {
            name += ' ' + this.getName(previousDigits);
        }
        return name;
    }
}

new Converter();

