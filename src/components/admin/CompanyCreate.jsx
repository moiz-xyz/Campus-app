import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { db } from '@/utils/constant';
import { addDoc, collection } from "firebase/firestore";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required!");
            return;
        }

        try {
            // Add new company to Firestore
            const docRef = await addDoc(collection(db, "companies"), {
                name: companyName,
                createdAt: new Date(),
            });

            const newCompany = {
                id: docRef.id,
                name: companyName,
                createdAt: new Date(),
            };

            // Update Redux store
            dispatch(setSingleCompany(newCompany));

            // Show success
            toast.success("Company registered successfully!");

            // Navigate to company detail page
            navigate(`/admin/companies/${docRef.id}`);
        } catch (error) {
            console.error("Error registering company:", error);
            toast.error("Failed to create company. Try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
