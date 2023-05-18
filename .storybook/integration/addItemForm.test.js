describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/?path=/story/additemform-component--add-item-form-base-example');

        const image = await page.screenshot();

        expect(image).toMathImageSnapshot();
    })
})