import { toast } from 'react-toastify';
import notify from './Toast';

describe('notify', () => {
    it("should have been called", () => {
        expect(notify('success', 'it was a success')).toHaveBeenCalled;
    })
    
})

describe('notify', () => {
    it("should be in the document", () => {
        expect(notify('success', 'it was a success')).toBeInTheDocument;
    })
    
})
