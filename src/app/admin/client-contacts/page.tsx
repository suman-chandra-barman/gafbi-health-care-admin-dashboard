/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import ClientContactsTable from "@/components/AdminComponents/ClientContactsComponents/ClientContactsTable";
import DeleteContactModal from "@/components/AdminComponents/ClientContactsComponents/DeleteContactModal";
// import ClientContactsTableSkeleton from "@/components/Skeleton/ClientContactsTableSkeleton";
import {
	type ContactMessage,
	useDeleteContactMutation,
	useGetContactsQuery,
} from "@/redux/features/contact/contactApi";
import ClientContactsTableSkeleton from "@/components/Skeleton/ClientContactsTableSkeleton";

const ClientContactsPage = () => {
	const [page, setPage] = useState(1);
	const [selectedContact, setSelectedContact] =
		useState<ContactMessage | null>(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const limit = 10;

	const { data, isLoading, isError } = useGetContactsQuery({ page, limit });
	const [deleteContact, { isLoading: isDeleting }] =
		useDeleteContactMutation();
	const contacts = data?.data ?? [];
	const totalPages = data?.meta.totalPage ?? 1;

	useEffect(() => {
		if (isError) {
			toast.error("Failed to load contacts.");
		}
	}, [isError]);

	const handleDelete = (contact: ContactMessage) => {
		setSelectedContact(contact);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!selectedContact) {
			return false;
		}

		try {
			await deleteContact(selectedContact.id).unwrap();
			toast.success("Contact deleted successfully.");
			return true;
		} catch {
			toast.error("Failed to delete contact.");
			return false;
		}
	};

	const handleCloseDeleteModal = () => {
		setDeleteModalOpen(false);
		setSelectedContact(null);
	};

	const canGoBack = page > 1;
	const canGoForward = page < totalPages;

	if (isLoading) {
		return (
			<div>
				<ClientContactsTableSkeleton rows={10} />
			</div>
		);
	}

	return (
		<div className="">
			<ClientContactsTable contacts={contacts} onDelete={handleDelete} />

			<div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#4b5563]">
				<span>
					Page {page} of {totalPages}
				</span>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((prev) => Math.max(1, prev - 1))}
						disabled={!canGoBack}
						className="h-8"
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
						disabled={!canGoForward}
						className="h-8"
					>
						Next
					</Button>
				</div>
			</div>

			<DeleteContactModal
				isOpen={deleteModalOpen}
				onClose={handleCloseDeleteModal}
				contact={selectedContact}
				onConfirm={handleConfirmDelete}
				isDeleting={isDeleting}
			/>
		</div>
	);
};

export default ClientContactsPage;
