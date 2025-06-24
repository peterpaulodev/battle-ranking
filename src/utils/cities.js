const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
]

const ddds = [
  { value: '11', label: '11 (SP)' },
  { value: '12', label: '12 (SP)' },
  { value: '13', label: '13 (SP)' },
  { value: '14', label: '14 (SP)' },
  { value: '15', label: '15 (SP)' },
  { value: '16', label: '16 (SP)' },
  { value: '17', label: '17 (SP)' },
  { value: '18', label: '18 (SP)' },
  { value: '19', label: '19 (SP)' },
  { value: '21', label: '21 (RJ)' },
  { value: '22', label: '22 (RJ)' },
  { value: '24', label: '24 (RJ)' },
  { value: '27', label: '27 (ES)' },
  { value: '28', label: '28 (ES)' },
  { value: '31', label: '31 (MG)' },
  { value: '32', label: '32 (MG)' },
  { value: '33', label: '33 (MG)' },
  { value: '34', label: '34 (MG)' },
  { value: '35', label: '35 (MG)' },
  { value: '37', label: '37 (MG)' },
  { value: '38', label: '38 (MG)' },
  { value: '41', label: '41 (PR)' },
  { value: '42', label: '42 (PR)' },
  { value: '43', label: '43 (PR)' },
  { value: '44', label: '44 (PR)' },
  { value: '45', label: '45 (PR)' },
  { value: '46', label: '46 (PR)' },
  { value: '47', label: '47 (SC)' },
  { value: '48', label: '48 (SC)' },
  { value: '49', label: '49 (SC)' },
  { value: '51', label: '51 (RS)' },
  { value: '53', label: '53 (RS)' },
  { value: '54', label: '54 (RS)' },
  { value: '55', label: '55 (RS)' },
  { value: '61', label: '61 (DF)' },
  { value: '62', label: '62 (GO)' },
  { value: '64', label: '64 (GO)' },
  { value: '63', label: '63 (TO)' },
  { value: '65', label: '65 (MT)' },
  { value: '66', label: '66 (MT)' },
  { value: '67', label: '67 (MS)' },
  { value: '68', label: '68 (AC)' },
  { value: '69', label: '69 (RO)' },
  { value: '71', label: '71 (BA)' },
  { value: '73', label: '73 (BA)' },
  { value: '74', label: '74 (BA)' },
  { value: '75', label: '75 (BA)' },
  { value: '77', label: '77 (BA)' },
  { value: '79', label: '79 (SE)' },
  { value: '81', label: '81 (PE)' },
  { value: '82', label: '82 (AL)' },
  { value: '83', label: '83 (PB)' },
  { value: '84', label: '84 (RN)' },
  { value: '85', label: '85 (CE)' },
  { value: '86', label: '86 (PI)' },
  { value: '87', label: '87 (PE)' },
  { value: '88', label: '88 (CE)' },
  { value: '89', label: '89 (PI)' },
  { value: '91', label: '91 (PA)' },
  { value: '92', label: '92 (AM)' },
  { value: '93', label: '93 (PA)' },
  { value: '94', label: '94 (PA)' },
  { value: '95', label: '95 (RR)' },
  { value: '96', label: '96 (AP)' },
  { value: '97', label: '97 (AM)' },
  { value: '98', label: '98 (MA)' },
  { value: '99', label: '99 (MA)' }
]

const getCities = async (state) => {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
  )
  const data = await response.json()

  const cities = data.map((city) => {
    return {
      value: String(city.id),
      label: city.nome
    }
  })
  console.log('citiesaaaaaa :', cities)

  return cities
}

export { states, ddds, getCities }
