const axios = require('axios')

describe('bparse', () => {
  beforeAll(async () => {
    await new Promise(r => setTimeout(r, 500))
  })

  it('should parse JSON params correctly', async () => {
    const data = (
      await axios.post('http://localhost:7000', { db: { name: 'hello' } })
    ).data
    expect(data.params.db.name).toBe('hello')
  })

  it('should parse Multipart params correctly', async () => {
    const formData = new FormData()
    formData.append('config', JSON.stringify({ resize: [1, 2] }))
    formData.append('action', 'upload')
    const data = (
      await axios.post(
        'http://localhost:7000',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
    ).data
    expect(data.params.config.resize).toEqual([1, 2])
  })
})